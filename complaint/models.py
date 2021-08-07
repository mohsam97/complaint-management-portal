from django.db import models
from django.utils.translation import ugettext_noop

from user.models import User


class ComplaintStatuses(object):
    pending = "p"
    resolved = "r"
    dismissed = "d"


class Complaint(models.Model):
    COMPLAINT_STATUSES = (
        (ComplaintStatuses.pending, ugettext_noop("Pending")),
        (ComplaintStatuses.resolved, ugettext_noop("Resolved")),
        (ComplaintStatuses.dismissed, ugettext_noop("Dismissed")),
    )

    complained_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    status = models.CharField(
        blank=False,
        null=False,
        default=ComplaintStatuses.pending,
        max_length=1,
        db_index=True,
        choices=COMPLAINT_STATUSES,
    )
    description = models.TextField(null=False, blank=False)
