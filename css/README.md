# CSS Component Structure

This directory contains a modular CSS approach where styles are separated by component for better maintainability.

## File Structure

- **style.css** - Main stylesheet that imports all component styles
- **global.css** - Global styles, variables, utility classes, and common elements
- **header.css** - Styles for the header component including navbar and notification bar
- **hero-slider.css** - Styles for the ultra-modern hero slider component
- **ui-elements.css** - Reusable UI elements like badges, buttons, and card styles
- **admission-card.css** - Styles for the floating admission card
- **sections.css** - Styles for content sections (welcome, courses, testimonials)
- **footer.css** - Styles for the footer component

## Usage

The main `style.css` file imports all the component CSS files, so you only need to include `style.css` in your HTML. This approach allows for:

1. **Better organization** - Styles are grouped by component
2. **Easier maintenance** - Update specific components without affecting others
3. **Improved collaboration** - Multiple developers can work on different components
4. **Better readability** - Find styles quickly by looking in the appropriate component file

## Naming Conventions

- Class names follow a component-based approach
- BEM (Block, Element, Modifier) naming is used where appropriate
- Component-specific classes are prefixed with their component name

## Media Queries

Responsive styles for each component are included in the respective component's CSS file. 