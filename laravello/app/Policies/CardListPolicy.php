<?php

namespace App\Policies;

use App\Models\CardList;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CardListPolicy
{
    use HandlesAuthorization;

    public function createCard(User $user, CardList $cardList): bool
    {
        return $user->id === $cardList->board->owner_id;
    }
}
