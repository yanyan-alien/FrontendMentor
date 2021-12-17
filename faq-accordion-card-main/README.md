# Frontend Mentor - FAQ accordion card solution

This is a solution to the [FAQ accordion card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-card-XlyjD0Oam). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  <!-- - [Screenshot](#screenshot) -->
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  <!-- - [Useful resources](#useful-resources) -->
<!-- - [Author](#author) -->

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- See hover states for all interactive elements on the page
- Hide/Show the answer to a question when the question is clicked

<!-- ### Screenshot

![](./screenshot.jpg) -->


### Links

- Solution URL: [Github](https://github.com/yanyan-alien/FrontendMentor/tree/master/faq-accordion-card-main)
- Live Site URL: [Github Page](https://yanyan-alien.github.io/FrontendMentor/faq-accordion-card-main/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
<!-- - Flexbox -->
<!-- - CSS Grid -->
- Mobile-first workflow
<!-- - [React](https://reactjs.org/) - JS library -->
<!-- - [Next.js](https://nextjs.org/) - React framework -->
<!-- - [Styled Components](https://styled-components.com/) - For styles -->

### What I learned

Making use of event listeners to check if user click on the element
```js
var s = document.getElementsByTagName('section'), i;
function reveal() {
  for(i=0;i<s.length;i++) {
    if(s[i] != this) s[i].classList.remove('active');
  }  
  this.classList.toggle('active');
}

for(i=0;i<s.length;i++) {
  s[i].addEventListener("click", reveal);
    }
```
Using psuedo element ```::after``` to position arrowhead
```css
h2::after {
    content: url("./images/icon-arrow-down.svg");
    float: right;
    transition: transform 0.3s;
}
```

Using ```:not()``` to disable orange accent on the question after its answer is shown on the accordion
```css
section:not(.active):hover h2  {
    color: hsl(14, 88%, 65%);
}    
```



### Continued development

<!-- Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->
- Further improvement on the responsive design for web and mobile
- Spacing between each questions


<!-- ### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept. -->


<!-- ## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername) -->