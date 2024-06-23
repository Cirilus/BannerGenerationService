from typing import Sequence

from fastapi import Depends

from models.preference import Preference
from repositories.preference import PresenceRepository
from schemas.preference import ListServiceOpts


class PreferenceService:
    def __init__(self, repo: PresenceRepository = Depends()):
        self.repo = repo

    async def list(self, opts: ListServiceOpts) -> Sequence[Preference]:
        result = await self.repo.list(opts)

        return result
