DROP DATABASE memoscope;
CREATE DATABASE memoscope;
psql memoscope < './migrations/20160615142700_create_base_tables.sql';
```

## SEEDERS
Run seed files from ./seeders

Example:
```
psql memoscope < './seeders/user.sql';
```
silota.com
