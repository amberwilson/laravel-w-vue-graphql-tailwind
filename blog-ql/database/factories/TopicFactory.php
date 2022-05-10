<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory
 */
class TopicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $words = $this->faker->words(random_int(2, 5), true);

        return [
            'name' => Str::title($words),
            'slug' => Str::slug($words),
        ];
    }
}
