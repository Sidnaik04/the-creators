import supabase from './client'

// Save quiz score to Supabase
export const saveQuizScore = async (score, mode) => {
  const {
    data: { user },
    error: sessionError
  } = await supabase.auth.getUser()

  if (sessionError || !user) return { error: 'Not logged in' }

  const { error } = await supabase.from('quiz_scores').insert([
    {
      user_id: user.id,
      score,
      mode,
    }
  ])
  if (error) return { error: error.message }
  return { success: true }
}

// Save typing trainer score (WPM and accuracy)
export const saveTypingScore = async (wpm, accuracy) => {
  const {
    data: { user },
    error: sessionError
  } = await supabase.auth.getUser()

  if (sessionError || !user) return { error: 'Not logged in' }

  const { error } = await supabase.from('typing_scores').insert([
    {
      user_id: user.id,
      wpm,
      accuracy,
    }
  ])
  if (error) return { error: error.message }
  return { success: true }
}
