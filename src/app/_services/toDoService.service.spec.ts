/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToDoServiceService } from './toDoService.service';

describe('Service: ToDoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoServiceService]
    });
  });

  it('should ...', inject([ToDoServiceService], (service: ToDoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
