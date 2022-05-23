<?php

namespace App\Policies;

use App\Models\Card;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CardPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Card $card): bool
    {
        return $user->id === $card->owner_id;
    }

    public function delete(User $user, Card $card): bool
    {
        return $user->id === $card->owner_id;
    }
}
