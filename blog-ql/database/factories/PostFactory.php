<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'topic_id' => $this->faker->numberBetween(1, 3),
            'author_id' => $this->faker->numberBetween(1, 20),
            'title' => $this->faker->sentence(3),
            'lead' => $this->faker->text(),
            'content' => $this->faker->paragraphs(10, true),
        ];
    }
}
