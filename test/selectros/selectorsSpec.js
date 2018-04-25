import expect from 'expect';
import { authorsFormattedForDropdown } from '../../src/selectors/selectors';

describe('Selectors', () => {
   describe('authorFormattedForDropdown', () => {
       it('shopuld return author data formatted for use in a dropdown', () => {
           const authors = [
               { id: 'khachatur-tovmasyan', firstName: 'Khachatur', lastName: 'Tovmasyan' },
               { id: 'cory-house', firstName: 'Cory', lastName: 'House' },
           ];

           const expectedDropdown = [
               { value: 'khachatur-tovmasyan', text: 'Khachatur Tovmasyan'},
               { value: 'cory-house', text: 'Cory House'},
           ];

           expect(authorsFormattedForDropdown(authors)).toEqual(expectedDropdown);

       })
   })
});  