// *** Import Gsap Librairy ***
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Use Gsap to detect when element is in viewport and trigger a css animation.
// The first parameter take the ref of an dom element, second parameter is a string that take the class name of the animation,
// third is an int that correspond to duration of animation, fourth an int that correspond to delay before animation start.

export function animateElementOnScroll(element, animation, duration, delay) {
   // Get dom element from ref
   const domElement = element.value.$el || element.value;
   gsap.to(domElement, {
      scrollTrigger: {
         trigger: domElement,
         once: true,
         start: 'top 100%',
         onEnter: () => {
            gsap.delayedCall(delay, () => {
               domElement.classList.add('animate__animated', animation, duration);
               domElement.classList.remove('invisible');
            });
         },
         onLeaveBack: () => {
            gsap.delayedCall(delay, () => {
               domElement.classList.remove(
                  'animate__animated',
                  animation,
                  'animate_duration-' + duration + 's',
               );
            });
         },
      },
   });
}
