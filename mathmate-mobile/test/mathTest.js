// Simple test file to verify mathematical functions
import { MathUtils } from '../utils/mathUtils'

// Test basic arithmetic
console.log('Testing basic arithmetic...')
console.log('2 + 2 =', MathUtils.evaluate('2 + 2'))
console.log('10 * 5 =', MathUtils.evaluate('10 * 5'))

// Test trigonometric functions
console.log('\nTesting trigonometric functions...')
console.log('sin(30°) =', MathUtils.sin(30, 'deg'))
console.log('cos(60°) =', MathUtils.cos(60, 'deg'))

// Test calculus functions
console.log('\nTesting calculus functions...')
console.log('Derivative of x^2 at x=3:', MathUtils.derivative('x^2', 'x', 3))
console.log(
  'Integral of x^2 from 0 to 1:',
  MathUtils.integrate('x^2', 'x', 0, 1)
)

// Test statistics functions
console.log('\nTesting statistics functions...')
const data = [1, 2, 3, 4, 5]
console.log('Mean of [1,2,3,4,5]:', MathUtils.mean(data))
console.log('Standard deviation:', MathUtils.standardDeviation(data))

// Test algebra functions
console.log('\nTesting algebra functions...')
console.log('5! =', MathUtils.factorial(5))
console.log('GCD of 48 and 18:', MathUtils.gcd(48, 18))

console.log('\nAll tests completed!')
