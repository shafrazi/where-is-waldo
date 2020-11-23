# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

characters = Character.create(
  [
    { name: "Wilma", location: 50 },
    { name: "Whitebeard", location: 132 },
    { name: "Odlaw", location: 96 },
    { name: "Waldo", location: 53 },
  ]
)
