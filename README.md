# Task List

This is a personal project. I'm building an app to centralize some tasks with my family. It will have 3 main sections:

- A Shopping list
- A To-Do list
- A Notes section

The shopping list will be separated into a general section and a bulk (Costco) section. Data will be stored in a Firebase db and will update in realtime so that if someone makes a change, that change immediately propagates to anyone else using the app. Otherwise, the changes are all rendered when the app is next opened. This means that if I make a change from my computer, like adding an item to the shopping list my sister can see that change immediately on her phone from the parking lot at the store. If my daughter adds something to the to-do list from her tablet, I can see it immediately on my computer or phone, and so on.

Public deploy: https://vish213-task-list.netlify.app/

There's another deploy that my family actually uses. The one above is for public consumption.