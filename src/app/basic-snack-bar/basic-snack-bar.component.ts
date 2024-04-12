import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-basic-snack-bar',
  templateUrl: './basic-snack-bar.component.html',
  styleUrls: ['./basic-snack-bar.component.css']
})
export class BasicSnackBarComponent implements OnInit {
  constructor(
    public sbRef: MatSnackBarRef<BasicSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
  ngOnInit() {}
}
