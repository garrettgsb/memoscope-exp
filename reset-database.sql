psql postgres < 'drop-create-db.sql'
psql memoscope < './migrations/20160618140100_add_notified_at_to_cards.sql'
psql memoscope < './seeders/deck.sql';
psql memoscope < './seeders/user.sql';
psql memoscope < './seeders/card_demo.sql';

pg_dump --table=cards --data-only --column-inserts memoscope > card_seed_new.sql
