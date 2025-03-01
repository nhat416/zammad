// Copyright (C) 2012-2023 Zammad Foundation, https://zammad-foundation.org/

import { textToHtml, debouncedQuery } from '../helpers'

describe('textToHtml', () => {
  it('adds links to URL-like text', () => {
    const input = 'Some Text\n\nhttp://example.com'
    const output =
      '<div>Some Text</div><div><br></div><div><a href="http://example.com">http://example.com</a></div>'

    expect(textToHtml(input)).toBe(output)
  })

  it('escapes HTML-like text to make sure it is presented as-is', () => {
    const input = '<p>&It;div&gt;hello world&lt;/div&gt;</p>'
    const output =
      '<div>&lt;p&gt;&amp;It;div&amp;gt;hello world&amp;lt;/div&amp;gt;&lt;/p&gt;</div>'

    expect(textToHtml(input)).toBe(output)
  })
})

describe('debouncedQuery', () => {
  it('returns values correctly', async () => {
    let i = 0
    const fn = debouncedQuery(async () => {
      i += 1
      return i
    }, 0)
    const res1 = fn()
    const res2 = fn()
    const res3 = fn()

    // cancels the first two calls, and returns default value in that case
    expect(await res1).toBe(0)
    expect(await res2).toBe(0)
    expect(await res3).toBe(1)

    const res4 = fn()
    const res5 = fn()

    // cancels the first call, and returns the last value in that case
    expect(await res4).toBe(1)
    expect(await res5).toBe(2)
  })
})
