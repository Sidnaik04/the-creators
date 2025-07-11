import supabase from '../client.js'

export const signUp = async (email, password, name, nickname) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) throw error

  const user = data.user
  if (!user) throw new Error('User not returned from signup.')

  const { error: insertError } = await supabase.from('users').insert([
    {
      id: user.id,
      email,
      name,
      nickname,
    }
  ])

  if (insertError) throw new Error(`Insert into users table failed: ${insertError.message}`)

  return user
}

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data.user
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
