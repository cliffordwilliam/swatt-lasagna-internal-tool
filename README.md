## Development Protocol

1. update the schema
2. update the seed to reflect schema
3. delete all rows
4. push new schema to remote database
5. generate client again
5. seed

Delete all row works if node_env is in development

Vercel should set the node_env to dev when building from dev branch when building

```bash
NODE_ENV=development npm run update
```

## Peek Into Development Database

Referring to the .env.development.local data

```bash
npm run peek
```
