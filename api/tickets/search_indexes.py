
from haystack import indexes
from tickets.models import Ticket


class TicketIndex(indexes.SearchIndex, indexes.Indexable):

    text = indexes.CharField(document=True, use_template=True)

    status = indexes.IntegerField(
        model_attr='status__id'
    )

    category = indexes.IntegerField(
        model_attr='category__id'
    )

    issue_type = indexes.IntegerField(
        model_attr='issue_type__id'
    )

    gluu_server = indexes.IntegerField(
        model_attr='gluu_server__id'
    )

    os = indexes.IntegerField(
        model_attr='os__id'
    )

    created_by = indexes.IntegerField(
        model_attr='created_by__id',
        default=0
    )

    assignee = indexes.IntegerField(
        model_attr='assignee__id',
        default=0
    )

    company = indexes.IntegerField(
        model_attr='company_association__id',
        default=0
    )

    autocomplete = indexes.EdgeNgramField()

    @staticmethod
    def prepare_autocomplete(obj):
        return " ".join((obj.title, obj.body))

    def get_model(self):
        return Ticket

    def index_queryset(self, using=None):
        return self.get_model().actives.all()
