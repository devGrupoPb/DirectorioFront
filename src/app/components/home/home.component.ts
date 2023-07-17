import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor( private title:Title) {
    title.setTitle('home')
  }

  ngOnInit(): void {}

  //Domo data slider
  data = [
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img1.jpg',
      title: 'Slide 1',
    },
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img2.jpg',
      title: 'Slide 2',
    },
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img3.jpg',
      title: 'Slide 3',
    },
  ];
}
