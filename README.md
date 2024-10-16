## Development Protocol

1. update the schema
2. update the seed to reflect schema
3. delete all tables
4. push new schema to remote database
5. generate client again
6. seed

Delete all row works if node_env is in development

Vercel should set the node_env to dev when building from dev branch when building

```bash
VERCEL_ENV=development npm run update
```

## Before Pushing Dev

- Make sure that I have ran the above first
- Then I can push dev

## Peek Into Development Database

Referring to the .env.development.local data

```bash
npm run peek
```
