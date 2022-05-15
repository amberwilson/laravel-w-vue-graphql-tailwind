<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\CardList;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(20)->create();

        $boardA = Board::create(
            ['title' => 'Groceries', 'color' => 'teal', 'owner_id' => 1]
        );
        $boardB = Board::create(
            ['title' => 'Work', 'color' => 'teal', 'owner_id' => 1]
        );
        $boardC = Board::create(
            ['title' => 'Hobby', 'color' => 'teal', 'owner_id' => 1]
        );

        collect([$boardA, $boardB, $boardC])->each(function (Board $board) {
            $listA = CardList::create(
                ['title' => 'To-Do', 'board_id' => $board->id]
            );
            $listB = CardList::create(
                ['title' => 'In Progress', 'board_id' => $board->id]
            );
            $listC = CardList::create(
                ['title' => 'Done', 'board_id' => $board->id]
            );

            collect([$listA, $listB, $listC])->each(
                function (CardList $list) use ($board) {
                    $order = 1;
                    collect([
                        'Buy groceries',
                        'Take the dog for a walk',
                        'Pay the bills',
                        'Get the car fixed',
                        'Write novel',
                        'Buy food',
                        'Paint a picture',
                        'Create a course'
                    ])->random(random_int(2, 5))->each(
                        static function (string $task) use (
                            $board,
                            $list,
                            &$order
                        ) {
                            $list->cards()->save(
                                Card::make([
                                    'title'    => $task,
                                    'owner_id' => $board->owner_id,
                                    'order'    => $order++
                                ])
                            );
                        }
                    );
                }
            );
        });
    }
}
