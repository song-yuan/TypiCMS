<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('SentrySeeder');
		$this->call('SettingsSeeder');
		$this->call('PageSeeder');
		$this->call('MenuSeeder');
		$this->call('CategorySeeder');
		$this->call('ProjectSeeder');
		$this->call('EventSeeder');
	}

}