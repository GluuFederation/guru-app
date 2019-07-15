
from haystack import indexes
from tickets.models import Ticket


class TicketIndex(indexes.SearchIndex, indexes.Indexable):

    text = indexes.CharField(document=True, use_template=True)

    gluu_server = indexes.CharField(
        model_attr='gluu_server'
    )

    os = indexes.CharField(
        model_attr='os'
    )

    title = indexes.CharField(
        model_attr='title'
    )

    autocomplete = indexes.EdgeNgramField()

    @staticmethod
    def prepare_autocomplete(obj):
        return " ".join((obj.title, obj.body))

    def get_model(self):
        return Ticket

    def index_queryset(self, using=None):
        return self.get_model().actives.all()
