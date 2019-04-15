import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'guru.settings')

app = Celery('guru')
app.config_from_object('guru.celeryconfig')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
