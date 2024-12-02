import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items', () => {
    expect(service.getItems()).toEqual([] as any);
  });

  it('should add item', () => {
    expect(service.addItem({} as any)).toEqual({} as any);
  });

  it('should delete item', () => {
    expect(service.deleteItem('1')).toEqual({} as any);
  });

});
