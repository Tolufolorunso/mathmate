import * as math from 'mathjs'

// Advanced mathematical utilities for the scientific calculator

export class MathUtils {
  // Basic arithmetic and scientific functions
  static evaluate(expression, scope = {}) {
    try {
      return math.evaluate(expression, scope)
    } catch (error) {
      throw new Error(`Evaluation error: ${error.message}`)
    }
  }

  // Trigonometric functions with angle unit support
  static sin(angle, unit = 'rad') {
    const radAngle = unit === 'deg' ? (angle * Math.PI) / 180 : angle
    return Math.sin(radAngle)
  }

  static cos(angle, unit = 'rad') {
    const radAngle = unit === 'deg' ? (angle * Math.PI) / 180 : angle
    return Math.cos(radAngle)
  }

  static tan(angle, unit = 'rad') {
    const radAngle = unit === 'deg' ? (angle * Math.PI) / 180 : angle
    return Math.tan(radAngle)
  }

  static asin(value, unit = 'rad') {
    const result = Math.asin(value)
    return unit === 'deg' ? (result * 180) / Math.PI : result
  }

  static acos(value, unit = 'rad') {
    const result = Math.acos(value)
    return unit === 'deg' ? (result * 180) / Math.PI : result
  }

  static atan(value, unit = 'rad') {
    const result = Math.atan(value)
    return unit === 'deg' ? (result * 180) / Math.PI : result
  }

  // Calculus functions
  static derivative(expression, variable = 'x', point = null) {
    try {
      if (point !== null) {
        // Evaluate derivative at a specific point
        const derivative = math.derivative(expression, variable)
        return derivative.evaluate({ [variable]: point })
      } else {
        // Return symbolic derivative
        return math.derivative(expression, variable).toString()
      }
    } catch (error) {
      throw new Error(`Derivative error: ${error.message}`)
    }
  }

  static integrate(expression, variable = 'x', lower = null, upper = null) {
    try {
      if (lower !== null && upper !== null) {
        // Definite integral
        return math.integrate(expression, variable, lower, upper)
      } else {
        // Indefinite integral
        return math.integrate(expression, variable).toString()
      }
    } catch (error) {
      throw new Error(`Integration error: ${error.message}`)
    }
  }

  static limit(expression, variable, value, direction = 'both') {
    try {
      // Simple limit calculation (mathjs doesn't have built-in limits)
      const epsilon = 0.0001
      let result

      if (direction === 'both') {
        const left = this.evaluate(
          expression.replace(new RegExp(variable, 'g'), value - epsilon)
        )
        const right = this.evaluate(
          expression.replace(new RegExp(variable, 'g'), value + epsilon)
        )
        result = (left + right) / 2
      } else if (direction === 'left') {
        result = this.evaluate(
          expression.replace(new RegExp(variable, 'g'), value - epsilon)
        )
      } else if (direction === 'right') {
        result = this.evaluate(
          expression.replace(new RegExp(variable, 'g'), value + epsilon)
        )
      }

      return result
    } catch (error) {
      throw new Error(`Limit error: ${error.message}`)
    }
  }

  // Series and sequences
  static sum(expression, variable, start, end) {
    try {
      let sum = 0
      for (let i = start; i <= end; i++) {
        sum += this.evaluate(expression.replace(new RegExp(variable, 'g'), i))
      }
      return sum
    } catch (error) {
      throw new Error(`Sum error: ${error.message}`)
    }
  }

  static product(expression, variable, start, end) {
    try {
      let product = 1
      for (let i = start; i <= end; i++) {
        product *= this.evaluate(
          expression.replace(new RegExp(variable, 'g'), i)
        )
      }
      return product
    } catch (error) {
      throw new Error(`Product error: ${error.message}`)
    }
  }

  // Statistics functions
  static mean(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Input must be a non-empty array')
    }
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }

  static median(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Input must be a non-empty array')
    }
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid]
  }

  static mode(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Input must be a non-empty array')
    }
    const frequency = {}
    let maxFreq = 0
    let modes = []

    values.forEach((value) => {
      frequency[value] = (frequency[value] || 0) + 1
      if (frequency[value] > maxFreq) {
        maxFreq = frequency[value]
        modes = [value]
      } else if (frequency[value] === maxFreq) {
        modes.push(value)
      }
    })

    return modes.length === values.length ? 'No mode' : modes
  }

  static variance(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('Input must be a non-empty array')
    }
    const mean = this.mean(values)
    return (
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      values.length
    )
  }

  static standardDeviation(values) {
    return Math.sqrt(this.variance(values))
  }

  // Algebra functions
  static solveQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c
    if (discriminant < 0) {
      const realPart = -b / (2 * a)
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a)
      return {
        x1: `${realPart} + ${imaginaryPart}i`,
        x2: `${realPart} - ${imaginaryPart}i`,
      }
    } else if (discriminant === 0) {
      const x = -b / (2 * a)
      return { x1: x, x2: x }
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      return { x1, x2 }
    }
  }

  static solveLinear(a, b) {
    if (a === 0) {
      throw new Error('No solution: a cannot be zero')
    }
    return -b / a
  }

  static factorial(n) {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('Factorial is only defined for non-negative integers')
    }
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  static gcd(a, b) {
    a = Math.abs(a)
    b = Math.abs(b)
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  static lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b)
  }

  // Complex number operations
  static complex(real, imaginary) {
    return math.complex(real, imaginary)
  }

  static complexAdd(a, b) {
    return math.add(a, b)
  }

  static complexSubtract(a, b) {
    return math.subtract(a, b)
  }

  static complexMultiply(a, b) {
    return math.multiply(a, b)
  }

  static complexDivide(a, b) {
    return math.divide(a, b)
  }

  // Matrix operations
  static createMatrix(data) {
    return math.matrix(data)
  }

  static matrixDeterminant(matrix) {
    return math.det(matrix)
  }

  static matrixInverse(matrix) {
    return math.inv(matrix)
  }

  static matrixTranspose(matrix) {
    return math.transpose(matrix)
  }

  // Number theory
  static isPrime(n) {
    if (n < 2) return false
    if (n === 2) return true
    if (n % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false
    }
    return true
  }

  static primeFactors(n) {
    const factors = []
    let divisor = 2

    while (n >= 2) {
      if (n % divisor === 0) {
        factors.push(divisor)
        n = n / divisor
      } else {
        divisor++
      }
    }

    return factors
  }

  // Unit conversions
  static convertAngle(value, from, to) {
    const conversions = {
      deg: {
        rad: (deg) => (deg * Math.PI) / 180,
        grad: (deg) => (deg * 400) / 360,
      },
      rad: {
        deg: (rad) => (rad * 180) / Math.PI,
        grad: (rad) => (rad * 400) / (2 * Math.PI),
      },
      grad: {
        deg: (grad) => (grad * 360) / 400,
        rad: (grad) => (grad * 2 * Math.PI) / 400,
      },
    }

    if (conversions[from] && conversions[from][to]) {
      return conversions[from][to](value)
    }
    throw new Error(`Unsupported conversion from ${from} to ${to}`)
  }

  // Error handling and validation
  static validateExpression(expression) {
    try {
      // Try to parse the expression
      math.parse(expression)
      return { valid: true }
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }

  static formatNumber(number, precision = 10) {
    if (typeof number === 'number') {
      return math.format(number, { precision })
    }
    return number.toString()
  }
}

// Export individual functions for convenience
export const {
  evaluate,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  derivative,
  integrate,
  limit,
  sum,
  product,
  mean,
  median,
  mode,
  variance,
  standardDeviation,
  solveQuadratic,
  solveLinear,
  factorial,
  gcd,
  lcm,
  complex,
  complexAdd,
  complexSubtract,
  complexMultiply,
  complexDivide,
  createMatrix,
  matrixDeterminant,
  matrixInverse,
  matrixTranspose,
  isPrime,
  primeFactors,
  convertAngle,
  validateExpression,
  formatNumber,
} = MathUtils
