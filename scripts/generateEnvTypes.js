import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs'

const dir = './@types/'
const stagingAndProd = existsSync('.env.staging') && existsSync('.env.prod')

const contents = () => {
  const env = readFileSync('.env', { encoding: 'ASCII' })
  const envLines = env.split('\n')
  let envStagingLines = []
  let envProdLines = []
  if (stagingAndProd) {
    const envStaging = readFileSync('.env.staging', { encoding: 'ASCII' })
    const envProd = readFileSync('.env.prod', { encoding: 'ASCII' })
    envStagingLines = envStaging.split('\n')
    envProdLines = envProd.split('\n')
  }

  const filteredEnv = []
  const filteredEnvStaging = []
  const filteredEnvProd = []

  // Assumption: all files have the same number of lines
  for (let index = 0; index < envLines.length; index++) {
    const envLine = envLines[index]
    const envStagingLine = envStagingLines[index]
    const envProdLine = envProdLines[index]

    if (envLine.includes('=')) {
      if (envLine.includes('#')) {
        filteredEnv.push(envLine.split('#')[1].trim())
      } else {
        filteredEnv.push(envLine.trim())
      }
    }

    if (envStagingLine && envStagingLine.includes('=')) {
      if (envStagingLine.includes('#')) {
        filteredEnvStaging.push(envStagingLine.split('#')[1].trim())
      } else {
        filteredEnvStaging.push(envStagingLine.trim())
      }
    }

    if (envProdLine && envProdLine.includes('=')) {
      if (envProdLine.includes('#')) {
        filteredEnvProd.push(envProdLine.split('#')[1].trim())
      } else {
        filteredEnvProd.push(envProdLine.trim())
      }
    }
  }

  return [filteredEnv, filteredEnvProd, filteredEnvStaging]
}

const generate = () => {
  const [filteredEnv, filteredEnvProd, filteredEnvStaging] = contents()
  const envVariableNamesArray = []
  const envVariableValuesArray = []

  for (let i = 0; i < filteredEnv.length; i++) {
    // Assumption: the files we read are not just comments
    const envPair = filteredEnv[i].split('=')

    envVariableNamesArray.push(envPair[0])
    envVariableValuesArray.push(envPair[1])

    if (stagingAndProd) {
      const envStagingValue = filteredEnvStaging[i].split('=')[1]
      const envProdValue = filteredEnvProd[i].split('=')[1]
      envVariableValuesArray.push(envStagingValue, envProdValue)
    }
  }

  // Assumption: for every name/key there are 3 values (env, env.staging, env.prod)
  const table = []
  let valuesCursor = 0

  for (let i = 0; i < envVariableNamesArray.length; i++) {
    table[i] = [envVariableNamesArray[i], []]
    const totalPushCount = stagingAndProd ? 3 : 1
    let current = 0
    while (current !== totalPushCount) {
      const valueToPush = envVariableValuesArray[valuesCursor]
      if (!table[i][1].includes(valueToPush)) {
        table[i][1].push(valueToPush)
      }
      valuesCursor++
      current++
    }
  }

  const stringArrayMap = table.map((nameValueArray) => {
    const name = nameValueArray[0]
    const valuesArray = nameValueArray[1]

    let string = `${name}: `

    valuesArray.forEach((value, index) => {
      if (index === 0) {
        string = string.concat(`"${value}"`)
      } else {
        string = string.concat(` | "${value}"`)
      }
    })

    return string
  })

  const string = `declare module "react-native-config" {
  interface Env {
    ${stringArrayMap.join('\n    ')}
  }

  const Config: Env

  export default Config
}`
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
  writeFileSync(`${dir}env.d.ts`, string, 'utf8')
}

generate()
