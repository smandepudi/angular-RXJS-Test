import { Injectable } from '@angular/core';
import { of, Observable, forkJoin, combineLatest } from 'rxjs';
import { map, concatMap, mergeMap, tap, delay } from 'rxjs/operators';

@Injectable()
export class ApiCallsService {
  constructor() {}
  public getBookTitle(bookId: string): Observable<any> {
    const title =
      bookId === '0001'
        ? {
            title: 'Book 1',
          }
        : bookId === '0002'
        ? {
            title: 'The sequel',
          }
        : bookId === '0003'
        ? {
            title: 'Third and final book',
          }
        : bookId === '0004'
        ? {
            title: 'Fourth book. New beginings',
          }
        : bookId === '0005'
        ? {
            title: 'The second sequel',
          }
        : bookId === '0006'
        ? {
            title: 'The last chapter of the sequel',
          }
        : bookId === '0007'
        ? {
            title: '...The Prequel',
          }
        : '';
    return of(title).pipe(delay(Math.random() * 1000));
  }

  /**
   * Gets the book author for the specified book id
   */
  public getBookAuthor(bookId: string): Observable<any> {
    return of({ author: `Author ${bookId}` }).pipe(delay(Math.random() * 1000));
  }
  public getAll(): Observable<any> {
    return of([
      {
        bookId: '0001',
      },
      {
        bookId: '0002',
      },
      {
        bookId: '0003',
      },
      {
        bookId: '0004',
      },
      {
        bookId: '0005',
      },
      {
        bookId: '0006',
      },
      {
        bookId: '0007',
      },
    ]).pipe(delay(Math.random() * 1000));
  }
  /*************************************************** */
  /********End result should be. ********/

  /* Demonstrate your understanding of Asynchronous tasks by implementing a
   * function to aggregate book data from multiple Asynchronous sources into a
   * single JSON object. */
  /** 
[{
  author: "Author 0001"
  bookId: "0001"
  title: "Book 1"
},
{
  author: "Author 0002"
  bookId: "0002"
  title: "The sequel"
}]
***/
  /*************************************************** */

  public getAllBooks(): Observable<Array<any>> {
    return this.getAll().pipe(
      mergeMap((result: any) => {
        let r = [...result];

        // console.log('ids', result);
        // let allAuthors = r.map((book) => this.getBookAuthor(book.bookId));
        // let allTitles = r.map((book) => this.getBookTitle(book.bookId));

        /* comment 2 */

        /*  I was only able to get authors and add it to the object but not titles */
        // return forkJoin(...allAuthors).pipe(
        //   map((authorArray) => {
        //     console.log('Author Array', authorArray);
        //     let authorArr = [...result];
        //     authorArr.forEach((eachAuthor, index) => {
        //       eachAuthor.author = authorArray[index].author;
        //     });
        //     return r;
        //   })
        // );

        // return forkJoin(
        //   this.getBookAuthor('0001'),
        //   this.getBookTitle('0001')
        //   // getMultiValueObservable(), forkJoin on works for observables that complete
        // ).pipe(
        //   map(([first, second]) => {
        //     // forkJoin returns an array of values, here we map those values to an object
        //     // return { first, second };
        //     console.log(first);
        //     console.log(second);
        //     r.forEach((orgArr, index) => {
        //       orgArr.author = first.author;
        //       orgArr.title = second.title;
        //     });
        //     return r;
        //   })
        // );

        // const requests = r.map((item) => {
        //   return forkJoin(
        //     this.getBookAuthor(item.bookId),
        //     this.getBookTitle(item.bookId)
        //     // getMultiValueObservable(), forkJoin on works for observables that complete
        //   ).pipe(
        //     map(([first, second]) => {
        //       // return {
        //       //   originalItem: item,
        //       //   requestResult: result
        //       // };
        //       console.log(first);
        //       console.log(second);
        //       return [];
        //     })
        //   );
        // });

        /* working better but can only get author and not Title*/
        // const requests = r.map((item) => {
        //   return this.getBookAuthor(item.bookId).pipe(
        //     map((result) => {
        //       return {
        //         bookId: item.bookId,
        //         author: result.author,
        //       };
        //     })
        //   );
        // });

        // return forkJoin(requests);

        /* working better */
        const authorRequests = r.map((item) => {
          return this.getBookAuthor(item.bookId).pipe(
            map((result) => {
              return {
                bookId: item.bookId,
                author: result.author,
              };
            })
          );
        });

        const titleRequests = r.map((item) => {
          return this.getBookTitle(item.bookId).pipe(
            map((result) => {
              return {
                bookId: item.bookId,
                title: result.title,
              };
            })
          );
        });

        const requests = r.map((item) => {
          return forkJoin(
            this.getBookAuthor(item.bookId),
            this.getBookTitle(item.bookId)
          ).pipe(
            map(([authorInfo, titleInfo]) => {
              return {
                bookId: item.bookId,
                title: titleInfo.title,
                author: authorInfo.author,
              };
            })
          );
        });

        /***** How do i get both title and author requests */
        return forkJoin(requests);

        // return r;
      })
    );
  }
}
