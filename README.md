# [Royale Plus](http://royplus.herokuapp.com)

Facebook for Clash Royale players.

Sign up, browse decks, create your own collection and share.

## Features

### Accounts

- Profiles
- Registration
- Admin system

### Decks

- Browse user decks
- Build decks
- Edit random decks or copy from others
- Decks have arena, type, mode, avg elixir, etc...

### Activities

- Recent activities at homepage or user profile
- Activities for user registration, deck creation, updates, etc

### APIs

- Current API for users, decks, etc...
- [External API for card data and images](https://github.com/martincarrera/clash-royale-api)
- [External API for realtime clan and member data](https://github.com/cr-api/cr-api)

## Development

Create the virtual env with python3.

### Install requirmenets

```bash
> pip install -r requirements.txt
```

### Setup migrations

```bash
> python manage.py migrate
```

### Run server

```bash
> python manage.py runserver
```

## Feedback

Any contribution will be highly appreciated

### Report a bug or a suggesstion

[Create an issue](https://github.com/AmirSavnad/royale-plus/issues) or send an email: amir@savandbros.com
