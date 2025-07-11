import supabase from './client'

// Fetch top 10 quiz scores with user info
export const fetchQuizLeaderboard = async () => {
  const { data, error } = await supabase
    .from('quiz_scores')
    .select('score, created_at, user_id, users(name, username, ai_nickname)')
    .order('score', { ascending: false })
    .limit(10)

  if (error) return { error: error.message }
  return { data }
}

// Fetch top 10 typing scores with user info
export const fetchTypingLeaderboard = async () => {
  const { data, error } = await supabase
    .from('typing_scores')
    .select('wpm, accuracy, created_at, user_id, users(name, username, ai_nickname)')
    .order('wpm', { ascending: false })
    .limit(10)

  if (error) return { error: error.message }
  return { data }
}
