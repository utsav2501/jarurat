import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from .models import Message

class WorkerChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Fetch the worker_id from the URL (to target a specific worker profile)
        self.worker_id = self.scope['url_route']['kwargs']['worker_id']
        self.room_name = f'worker_{self.worker_id}'
        self.room_group_name = f'chat_{self.room_name}'

        # Join the chat group for this worker
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the chat group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = text_data_json['sender']

        # Save the message to the database
        user = get_user_model().objects.get(id=sender)
        worker = get_user_model().objects.get(id=self.worker_id)
        Message.objects.create(sender=user, content=message, receiver=worker)

        # Send the message to the group (room)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        # Send the message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))
