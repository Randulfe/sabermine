## Project setup

- Clone the repo: `git clone https://github.com/Randulfe/sabermine.git`
- Install dependencies: `npm ci`
- Run the development server: `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) and enjoy!

## Assumptions

- We want to track the approved matches per regex, i.e every regex we create will have a subset of approved matches for that regex. In a real world application, that way we could back track which matches came from which regex and if it turned out we just wanted to save the total matches they can be aggregated easily in the back-end.
- We are only interested in unique matches. For example, if an email contains multiple occurrences of `@mateorandulfe`, we only care about detecting whether this pattern exists and capturing a single instance of it. In other words, each match presented to the user should be a distinct string, without duplicates.
- When a regex is edited we should clear all matches as previous matches might not match anymore so apart from making sense it's also a safety measure.
- We want to allow users to change the status of approved matches back to unapproved matches for bigger flexibility and broader usability.

## Architecture

- Persist data locally using Zustand's local storage persistency.
- Each regex will have a unique id, its value (previously validated in the input) and a set of string matches which not only is more efficient but it also prevents duplicates.
- As I explained in the assumptions, I favored `Sets` over `Arrays` for the matches due to the intended functionality.
- Components are abstracted and each has the right level of responsibility in a clean code architecture way. In this case, the design system components are the frameworks whereas the app components are closer to entities.
- `@/components` is the application broad design system that can either be used for the current application or for any other subset of applications. Some engineers called these shared components.
- Hooks that are specific to the application's logic go inside the `app` folder, hooks that can be generic like `useDebounce` would go in the `src` level (that we if we ever switch to our custom npm package the switch will be easy). I like to keep that separation between application logic and shared/generic functionality.
- `@/app/components` are the application specific components that contain business logic about our application.
- Because this is a single route application and the left panel had specific business logic regarding our app niche functionality, I've set the left panel and content in the `Home` page. If there were other routes with a similar left panel I would have probable set the `Sidebar` in the `layout` and then have another layer of abstraction to use whichever components it required. Or if all of the routes shared this left panel I would have moved it to the layout.
