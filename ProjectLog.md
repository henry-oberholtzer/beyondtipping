# Beyond Tipping

## Tech Stack
  - Python Backend (Flask or Django?)
  - SQLite or Postgresql
  - Next.js / Tailwind / Prismic
  - Ionic Cap for

# Goals
  - Hostable by end of week? (Python anywhere?) (Vercel easy for next.js)

# What makes something "beyond tipping"
  - Replacing optional gratuity with either a service fee or flat prices that
  - Hourly employees are paid a living wage (pretty sure that's $21 an hour minimum in Portland?)

# Initial List

- Gracies Apizza (Flat price?)
- Mirisata (Flat price)
- Kachka (22% Service fee)
- Scottie's Pizza (Service fee)
- Bernstein's Bagels (Flat price)
- Masala Lab PDX (Flat price)
- Astera (Flat) a.k.a. Workshop
- Gigi's Cafe (Flat)
- El Gaucho (20% Service fee)
- Ava Gene's (20% Service fee)
- Cafe Olli (20% Service fee)

# MVP / Features
  - A list of locations that have moved beyond tipping to either a service charge or flat pricing for a livable wage
    - Name
    - Address
    - Lat / Long
    - Type of tip replacement
  - A map that shows the locations based on coordinates
  - Search function
  - A page that explains the reasoning to move beyond tipping
  - A page to submit a new location to add, pending approval / verification by admins (us)

- https://github.com/wpcodevo/nextjs-flask-framework


### Database Models:
1. Restaurant (id, name, address, lat/long, websiteUrl, imageUrl)
2. WageReplacement/Type (id, typeName) 1 type: many restaurant

### Front End Components:
- splash/hero
- about
- search
- map/waypoints
- details
- form (to create) w/admin approval
- form (to edit)
- about the dev team

### Stretch Goals:
* Build out Restaurant model (hours, foodType)
* Clickable restaurant to info


## To Do:

Henry:
  - Add Flask-Admin
  - Add Authentication for Admin