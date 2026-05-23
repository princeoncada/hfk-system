import { redirect } from 'next/navigation'

export default function EditRedirect({ params }: { params: { id: string } }) {
  redirect('/worksheets/' + params.id)
}
