const ts = require('typescript')

const xorParamCount = 200
const countOfUniqueLetters = 20
/**
 * Contains ['A', 'B', ..., <countOfUniqueLetters'th_letter_used_in_Array_constructor>]
 */
const uniqueLetters = [...Array(countOfUniqueLetters).keys()]
  .map(i => String.fromCharCode(i + 65))
const allParamNames = getUniqueSymbolPermutationsGivenPool(uniqueLetters, xorParamCount)
const  [,, ...paramNamesExcludingANorB] = allParamNames

function createXor() {
  const modifiers = [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)]
  const name = ts.factory.createIdentifier('XOR')
  const typeParams = createXorParams()
  const type = createXorType()

  return ts.factory.createTypeAliasDeclaration(modifiers, name, typeParams, type)
}

function createXorParams() {
  const xorParams = [
    ts.factory.createTypeParameterDeclaration(undefined, ts.factory.createIdentifier('A')),
    ts.factory.createTypeParameterDeclaration(undefined, ts.factory.createIdentifier('B')),
    ...paramNamesExcludingANorB.map((letter) => ts.factory.createTypeParameterDeclaration(
      undefined,
      ts.factory.createIdentifier(letter),
      undefined,
      ts.factory.createTypeReferenceNode('unknown')
    ))
  ]

  return xorParams
}

function createXorType() {
  const unionOfWithouts = ts.factory.createUnionTypeNode([
    createWithoutLettersIntersectingLetter(
      allParamNames.filter((letterToExclude) => letterToExclude !== 'A'),
      'A',
    ),
    createWithoutLettersIntersectingLetter(
      allParamNames.filter((letterToExclude) => letterToExclude !== 'B'),
      'B',
    ),
    ...paramNamesExcludingANorB.map(
      (letter) => ts.factory.createTypeReferenceNode(
        'EvalIfNotUnknown',
        [
          ts.factory.createTypeReferenceNode(letter),
          createWithoutLettersIntersectingLetter(
            allParamNames.filter((letterToExclude) => letterToExclude !== letter),
            letter,
          ),
        ]
      )
    )
  ])

  const type = ts.factory.createTypeReferenceNode('Prettify', [unionOfWithouts])

  return type
}

/**
 * @param {string[]} lettersExcludingLetter
 * @param {string} excludedLetter
 */
function createWithoutLettersIntersectingLetter(lettersExcludingLetter, excludedLetter) {
  const withoutLettersIntersectingLetter = ts.factory.createIntersectionTypeNode([
    createWithout(lettersExcludingLetter, excludedLetter),
    ts.factory.createTypeReferenceNode(excludedLetter)
  ])

  return withoutLettersIntersectingLetter
}

/**
 * @param {string[]} lettersExcludingLetter
 * @param {string} excludedLetter
 */
function createWithout(lettersExcludingLetter, excludedLetter) {
  const type = ts.factory.createTypeReferenceNode('Without', [
    ts.factory.createIntersectionTypeNode(
      lettersExcludingLetter.map((letter) => ts.factory.createTypeReferenceNode(letter))
    ),
    ts.factory.createTypeReferenceNode(excludedLetter)
  ])

  return type
}

/**
 * Takes a `symbolPool` and uses them solo and then matches them in pairs until
 * the provided count of unique symbols is reached.
 * If all possible pairs with the available symbols are already created and the
 * `countPermsToGenerate` is still not reached, then triplets will start to be generated,
 * then quadruplets, etc.
 *
 * @example
 * ```ts
 * getUniqueSymbolPermutationsGivenPool(['A', 'B'], 8)
 * // ['A', 'B', 'AA', 'AB', 'BA', 'BB', 'AAA', 'AAB']
 * ```
 *
 * @param {string[]} symbolPool
 * @param {number} countPermsToGenerate
 */
function getUniqueSymbolPermutationsGivenPool(symbolPool, countPermsToGenerate) {
  const generateItem = (index) => {
    if (index < 0) {
      return ''
    }
    const remainder = index % 20
    return generateItem(Math.floor(index / 20) - 1) + symbolPool[remainder]
  }

  const result = Array.from({ length: countPermsToGenerate }, (_, i) => generateItem(i))

  return result
}

const tempFile = ts.createSourceFile(
  'temp.ts',
  '',
  ts.ScriptTarget.ESNext,
  false, ts.ScriptKind.TS,
)
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  omitTrailingSemicolon: true,
})

const xorTsFileContents = `
import type { EvalIfNotUnknown } from './evalIfNotUnknown.js'
import type { Prettify } from './prettify.js'
import type { Without } from './without.js'

${
  printer.printNode(
    ts.EmitHint.Unspecified,
    ts.factory.createJSDocComment(
      `Restrict using either exclusively the keys of \`T\` or \
exclusively the keys of \`U\`.\n\n\
No unique keys of \`T\` can be used simultaneously with \
any unique keys of \`U\`.\n\n@example\n\
\`\`\`ts\nconst myVar: XOR<{ data: object }, { error: object }>\n\`\`\`\n\n\
Supports from 2 up to ${xorParamCount} generic parameters.\n\n\
More: https://github.com/maninak/ts-xor/tree/master#description\n`
    ),
    tempFile,
  )
}
${
  printer.printNode(ts.EmitHint.Unspecified, createXor(), tempFile)
}`

console.log(xorTsFileContents)
