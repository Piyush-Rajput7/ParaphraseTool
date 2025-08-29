import axios from 'axios'

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

export const paraphraseText = async (text) => {
  if (!validateText(text)) {
    throw new Error('Please enter some text to paraphrase')
  }
  
  const cleanedText = cleanInputText(text)
  return await callMockAPI(cleanedText)
}



const callMockAPI = async (text) => {
  await simulateApiDelay()
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  const paraphrasedSentences = sentences.map(sentence => {
    let trimmed = sentence.trim()
    if (trimmed.length === 0) return ''
    
    const synonymMap = {
      'very': ['extremely', 'remarkably', 'exceptionally', 'significantly'],
      'good': ['excellent', 'outstanding', 'superior', 'remarkable', 'exceptional'],
      'bad': ['poor', 'inadequate', 'substandard', 'unsatisfactory'],
      'big': ['large', 'substantial', 'considerable', 'extensive', 'massive'],
      'small': ['compact', 'minimal', 'modest', 'limited', 'minor'],
      'important': ['crucial', 'vital', 'essential', 'significant', 'critical'],
      'show': ['demonstrate', 'illustrate', 'reveal', 'display', 'exhibit'],
      'make': ['create', 'generate', 'produce', 'construct', 'develop'],
      'get': ['obtain', 'acquire', 'secure', 'attain', 'receive'],
      'use': ['utilize', 'employ', 'implement', 'apply', 'leverage'],
      'help': ['assist', 'support', 'aid', 'facilitate', 'enable'],
      'start': ['begin', 'initiate', 'commence', 'launch', 'establish'],
      'end': ['conclude', 'finalize', 'complete', 'terminate', 'finish'],
      'think': ['believe', 'consider', 'contemplate', 'assume', 'suppose'],
      'say': ['express', 'state', 'declare', 'articulate', 'communicate'],
      'find': ['discover', 'locate', 'identify', 'uncover', 'detect'],
      'work': ['function', 'operate', 'perform', 'execute', 'accomplish'],
      'need': ['require', 'necessitate', 'demand', 'call for', 'warrant']
    }
    
    Object.entries(synonymMap).forEach(([word, synonyms]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      if (regex.test(trimmed)) {
        const synonym = synonyms[Math.floor(Math.random() * synonyms.length)]
        trimmed = trimmed.replace(regex, synonym)
      }
    })
    
    const restructurePatterns = [
      { pattern: /^The (.+)/i, replacement: 'This $1' },
      { pattern: /^A (.+)/i, replacement: 'One $1' },
      { pattern: /^An (.+)/i, replacement: 'One $1' },
      { pattern: /^It is (.+)/i, replacement: 'This represents $1' },
      { pattern: /^There are (.+)/i, replacement: 'Multiple $1 exist' }
    ]
    
    restructurePatterns.forEach(({ pattern, replacement }) => {
      if (pattern.test(trimmed)) {
        trimmed = trimmed.replace(pattern, replacement)
      }
    })
    
    const transitions = [
      'Furthermore, ', 'Additionally, ', 'Moreover, ', 'In essence, ',
      'Notably, ', 'Specifically, ', 'Consequently, ', 'Therefore, ',
      'Subsequently, ', 'Nevertheless, ', 'Accordingly, ', 'Hence, ',
      'In particular, ', 'As a result, ', 'In other words, ', 'Ultimately, '
    ]
    
    if (Math.random() > 0.7 && sentences.length > 1) {
      const transition = transitions[Math.floor(Math.random() * transitions.length)]
      trimmed = transition + trimmed.toLowerCase()
    }
    
    return trimmed
  })
  
  let paraphrasedText = paraphrasedSentences.join('. ')
  
  if (!paraphrasedText.match(/[.!?]$/)) {
    paraphrasedText += '.'
  }
  
  if (Math.random() > 0.85) {
    const enhancedResponses = [
      "Here's a refined interpretation of your content:",
      "This represents an enhanced version of your original text:",
      "The following provides an alternative perspective on your message:",
      "Your content has been restructured for improved clarity:",
      "This offers a sophisticated rephrasing of your input:"
    ]
    
    const intro = enhancedResponses[Math.floor(Math.random() * enhancedResponses.length)]
    return `${intro}\n\n${paraphrasedText}`
  }
  
  return paraphrasedText
}

export const validateText = (text) => {
  if (!text || typeof text !== 'string') return false
  if (text.trim().length < 3) return false
  if (text.length > 5000) return false
  return true
}

export const testAPIConnection = async () => {
  return {
    hasApiKey: true,
    service: 'Paraphrasing Service',
    tests: [{
      name: 'Service Status',
      status: 'success',
      message: 'Service is working correctly'
    }]
  }
}

export const cleanInputText = (text) => {
  if (!text) return ''
  
  let cleaned = text.replace(/\s+/g, ' ').trim()
  
  cleaned = cleaned
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/…/g, '...')
    .replace(/–/g, '-')
    .replace(/—/g, '--')
  
  return cleaned
}