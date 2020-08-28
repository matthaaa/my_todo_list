This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Matt's todo list!

A simple todo list created with React!

This was created as a speed run, with an emphasis on rapid delivery rather than an overly extensive build; total time spent implementing was about 3-4 hours.

### Technologies and Libraries used

- ReactJS
- BootstrapJS
- React Datepicker
- Nanoid
- Yarn

### Main Features

- Add, edit, and delete todo lists, with the following attributes:
    - Name
    - Description
    - Completed Status
    - Due Date
- Basic report of tasks to be done and tasks that are due/overdue
- Ability to mark tasks as complete and gray them out
- Data persists on client using localStorage so that user can close their browser and still have their tasks loaded when they return to the page
- Empty state when no tasks are present

### Future Features

- Filtering tasks by specific attributes
- Custom Sorting (by name, description, etc.)
- Categories for tasks
- Search functionality
- A "Due today" section
- Calendar view of due dates
- Text alerts for upcoming due dates

### Optimizations and Implementation Details

- React was used since it makes it easier to use custom repeated components and to debug; in the same light, it's easier to use React as a whole app instead of inserting React properties into a html/ vanilla js app.

- Opted for functional components instead of class components because:
    - Functional componetns are easier to read and test 
    - They allow for less code to be typed out as a whole
    - Enabling of best practices; it's easier to separate containers and view components since you have to think more about state if you don’t have access to setState within a component.
    - There may be a performance boost in future React versions

- Generic form so that add and edit could be used without repeating styles; this assumes that all added attributes of tasks can be edited.

- Instead of updating specific attributes of tasks, a task object is created and then the main list of tasks is updated. This allows for maximum flexibility when creating, editing, and deleting tasks and enables us to use a single task state object, rather than adding a new state hook for each new attribute of a task in the future. 

- Colors.js file allows us to keep the color scheme of the app in one importable object and easily make adjustments to the app's color scheme

- Style objects within the same components, so that the styling can easily be referenced for the specific component that is being looked at. This makes for a lot less overhead and switching back and forth when implementing or changing styles in the future.

- Task helper methods for when methods for tasks need to be utilized in multiple places; this is an ongoing refactor.

- Using rem instead of px for accessibility purposes. This is also an ongoing refactor.

### Future Optimizations and Considerations:

- Creating generic components: currently there are custom styles added to the existing Bootstrap components used. By coupling the components with the corresponding custom styles, the component can simply be imported and used instead of re-styled each place it is used.
- Adding a styles.js helper so that repeated styles can simple be referenced. This problem can also be solved or used in tandem with the generic components file above
- A constants file that will contain objects as a source of truth in regards to filter variables, sorting names, etc. Having these variables in one place will mitigate the risk of typos and mislabelings as the app is built out.
- General add-ons for accessibility and screen reader compatibility.
- Custom hooks for actions around tasks that cleanly separates out more complicated logic into a separate file while allowing for state manipulation within functional components.