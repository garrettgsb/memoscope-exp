#UNBREAK THE DATABASE IN THREE EASY STEPS

## START DATABASE FROM SCRATCH
_enter psql with:_
`psql postgres`

    ```
    DROP DATABASE memoscope;
    CREATE DATABASE memoscope;
    ```

_quit out of psql_


## MIGRATIONS
Run newest migration from ./migrations
  - The newest migration will have
    all of the data that we need

Example:

```
psql memoscope < './migrations/20160615142700_create_base_tables.sql';
```

## SEEDERS
Run seed files from ./seeders

Example:
```
psql memoscope < './seeders/user.sql';
```
