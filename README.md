# CCLMS - College of Learning & Management Sciences Website

This is a responsive website for CCLMS (College of Learning & Management Sciences) built using HTML, CSS, Bootstrap 5, jQuery, and JavaScript.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Component-based architecture for easy maintenance
- Modern UI with Bootstrap 5
- Interactive elements with jQuery and JavaScript
- Optimized images and performance

## Project Structure

```
cclms-2/
├── index.html            # Main HTML file
├── css/
│   └── style.css         # Custom styles
├── js/
│   └── main.js           # Custom JavaScript
├── components/           # HTML components
│   ├── header.html       # Header component
│   ├── hero-banner.html  # Hero banner component
│   ├── welcome.html      # Welcome section component
│   ├── courses.html      # Courses section component
│   ├── testimonial.html  # Testimonial section component
│   └── footer.html       # Footer component
└── cclms/                # Images folder
    ├── college.png       # College logo
    ├── bg-cclms.jpg      # Background image
    ├── front_of_cclms.jpg # 3D model image
    ├── bca.jpeg          # BCA course image
    ├── bba.jpg           # BBA course image
    └── course_bhm.jpg    # BHM course image
```

## Getting Started

1. Clone the repository
2. Open the `index.html` file in a web browser to view the website

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- jQuery
- JavaScript
- Font Awesome icons

## Responsive Design

The website is fully responsive and optimized for the following screen sizes:
- Mobile devices (< 768px)
- Tablets (768px - 992px)
- Desktops (> 992px)

## Component-Based Architecture

The website uses a component-based architecture for better organization and maintenance. Each section of the website is separated into its own HTML file in the `components` directory, and loaded dynamically using jQuery's `load()` method.

## Customization

To customize the website:
1. Modify the CSS variables in `css/style.css` to change colors and styles
2. Update component HTML files to change content
3. Add or remove sections by modifying `index.html` and the corresponding component files

## Browser Compatibility

The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest) 