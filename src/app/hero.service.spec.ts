import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';
import { ELEMENT, Hero } from './hero';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let heroService: HeroService;
  let messageService: MessageService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const heroesUrl: string = 'api/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    heroService = TestBed.inject(HeroService);
    messageService = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('getHeroes() should call http Get method for the given route', () => {

    //Arrange
    //Set Up Data 
    let hero: Hero = { name: 'fakeHero', id: 2131, element: ELEMENT.FIRE };

    //Act
    heroService.getHeroes().subscribe((response) => {
      // Assert 1 - Verify the observable when it resolves, its result matches test data.
      expect(response).toHaveSize(1);
      expect(response[0]).toEqual(hero);

    });

    // Assert 2 - Verify the matched URL get called in the GET API else it throws errors.
    const req = httpMock.expectOne(heroesUrl);

    // Assert 3 - Verify that the request called is GET HTTP method only.
    expect(req.request.method).toBe("GET");

    // *****************************************
    // This is where we define our mocked data to return
    // *********************************************
    // Ensures the correct data was returned using Subscribe callback.
    req.flush([hero]);

    // Assert 4 - Ensures that all request are fulfilled and there are no outstanding requests.
    httpMock.verify();

  });

  it('getHeroes() should return an error if bad request', () => {

    heroService.getHeroes().subscribe(response => {
      expect(response).toEqual([]);
    })

    const status: number = 5;
    const statusText: string = "HEROES ERROR";
    httpMock.expectOne(heroesUrl)
      .error(new ErrorEvent('general error'), {
        status: status, statusText: statusText
      });

    expect(messageService.messages).toHaveSize(2);
    expect(messageService.messages[0]).toBe('HeroService: fetched heroes');
    expect(messageService.messages[1])
      .toBe(`HeroService: getHeroes failed: Http failure response for api/heroes: ${status} ${statusText}`);

    httpMock.verify();
  });



  it('getHero() should return the expected hero', () => {

    const hero = { id: 1, name: "test", element: ELEMENT.AIR };

    heroService.getHero(hero.id).subscribe(response => {
      expect(response).toBe(hero);
    });

    let url: string = heroesUrl + "/1";
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe("GET");

    req.flush(hero);

    httpMock.verify();
  });

  it('getHero() should return an error if bad request', () => {

    const hero = { id: 1, name: "test", element: ELEMENT.AIR };

    heroService.getHero(hero.id).subscribe(response => {
      expect(response).toBeUndefined();
    });

    let url: string = heroesUrl + "/1";
    const status: number = 3;
    const statusText: string = "BAD REQUEST";
    httpMock.expectOne(url)
      .error(new ErrorEvent('network error'), {
        status: status, statusText: statusText
      });

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: getHero failed: Http failure response for api/heroes/1: ${status} ${statusText}`);

    httpMock.verify();

  });

  it('addHero() should add a new hero', () => {

    const hero: Hero = { id: 10, name: 'newHero', element: ELEMENT.WATER };

    heroService.addHero(hero).subscribe(response => {
      expect(response).toBe(hero);
    });

    const req: TestRequest = httpMock.expectOne(heroesUrl);

    expect(req.request.method).toBe("POST");

    req.flush(hero);

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: added hero id=${hero.id}`);

    httpMock.verify();
  });

  it('addHero() should return an error if bad request', () => {

    const hero: Hero = { id: 10, name: 'newHero', element: ELEMENT.WATER };

    heroService.addHero(hero).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const status: number = 5;
    const statusText: string = "BAD REQUEST";
    httpMock.expectOne(heroesUrl)
      .error(new ErrorEvent("general error"), { status, statusText });

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: addHero failed: Http failure response for api/heroes: ${status} ${statusText}`);

    httpMock.verify();
  });

  it('updateHero() should update an already existing hero', () => {

    const hero: Hero = { id: 100, name: 'alreadyExistingHero', element: ELEMENT.WATER };

    heroService.updateHero(hero).subscribe(response => {
      expect(response).toBe(hero);
    });

    const req: TestRequest = httpMock.expectOne(heroesUrl);

    expect(req.request.method).toBe("PUT");

    req.flush(hero);

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: updated hero ${hero}`);

    httpMock.verify();
  });

  it('updateHero() should return an error if bad request', () => {

    const hero: Hero = { id: 10, name: 'alreadyExistingHEro', element: ELEMENT.WATER };

    heroService.updateHero(hero).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const status: number = 5;
    const statusText: string = "BAD REQUEST";
    httpMock.expectOne(heroesUrl)
      .error(new ErrorEvent("general error"), { status, statusText });

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: updateHero failed: Http failure response for api/heroes: ${status} ${statusText}`);

    httpMock.verify();
  });



  it('deleteHero() should delete an already existing hero', () => {

    const hero: Hero = { id: 100, name: 'alreadyExistingHero', element: ELEMENT.WATER };
    const url: string = [heroesUrl, hero.id].join("/");

    heroService.deleteHero(hero).subscribe(response => {
      expect(response).toBe(hero);
    });

    let req: TestRequest = httpMock.expectOne(url);

    expect(req.request.method).toBe("DELETE");

    req.flush(hero);

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: deleted hero id=${hero.id}`);

    heroService.deleteHero(hero.id).subscribe(response => {
      expect(response).toBe(hero);
    });

    req = httpMock.expectOne(url);

    expect(req.request.method).toBe("DELETE");

    req.flush(hero);

    expect(messageService.messages).toHaveSize(2);
    expect(messageService.messages[1])
      .toBe(`HeroService: deleted hero id=${hero.id}`);


    httpMock.verify();
  });

  it('deleteHero() should return an error if bad request', () => {

    const hero: Hero = { id: 10, name: 'alreadyExistingHEro', element: ELEMENT.WATER };
    const url: string = [heroesUrl, hero.id].join("/");

    heroService.deleteHero(hero).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const status: number = 5;
    const statusText: string = "BAD REQUEST";
    httpMock.expectOne(url)
      .error(new ErrorEvent("general error"), { status, statusText });

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: deleteHero failed: Http failure response for api/heroes/${hero.id}: ${status} ${statusText}`);

    httpMock.verify();
  });

  it('searchHeroesTest', () => {

    let term = "s";
    let req: TestRequest;
    let url: string;
    let expectedResponse: Hero[];

    // check: normal case
    expectedResponse = [
      { id: 1, name: "spiderman", element: ELEMENT.FIRE }
      , { id: 2, name: "superman", element: ELEMENT.AIR }
    ];
    heroService.searchHeroes(term).subscribe(response => {
      expect(response).toBe(expectedResponse);
    });

    url = heroesUrl + "/?name=" + term;
    req = httpMock.expectOne(url);

    req.flush(expectedResponse);

    expect(req.request.method).toBe("GET");

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: found heroes matching "${term}"`);

    // check: no term specified
    expectedResponse = [];
    term = "";
    heroService.searchHeroes(term).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    // the searchHeroes method return before running http request
    expect(messageService.messages).toHaveSize(1);

    // check: MessageService clear method
    messageService.clear();
    expect(messageService.messages).toHaveSize(0);

    // check: no hero found
    term = "s";
    expectedResponse = [];
    heroService.searchHeroes(term).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    url = heroesUrl + "/?name=" + term;
    req = httpMock.expectOne(url);

    req.flush(expectedResponse);

    expect(req.request.method).toBe("GET");

    expect(messageService.messages).toHaveSize(1);
    expect(messageService.messages[0])
      .toBe(`HeroService: no heroes matching "${term}"`);


    // check error
    heroService.searchHeroes(term).subscribe(response => {
      expect(response).toEqual([]);
    });

    const status: number = 5;
    const statusText: string = "BAD REQUEST";
    httpMock.expectOne(url)
      .error(new ErrorEvent("general error"), { status, statusText });

    expect(messageService.messages).toHaveSize(2);
    expect(messageService.messages[1])
      .toBe(`HeroService: searchHeroes failed: Http failure response for api/heroes/?name=${term}: ${status} ${statusText}`);


    httpMock.verify();
  });


});
