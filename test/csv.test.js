import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv } from '../src/csv.js';

test('counts rows', () => assert.equal(toCsv([1]), 1));
