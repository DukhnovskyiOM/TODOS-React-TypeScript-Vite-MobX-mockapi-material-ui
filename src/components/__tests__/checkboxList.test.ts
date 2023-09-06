import {describe, test, expect} from 'vitest';
import { getTodos } from '../../api/getTodos';

describe("loadData", () => {

    test('loads data as expected', async () => {

        const data = await getTodos();

        expect(data).toBeTypeOf("object")
      })
})