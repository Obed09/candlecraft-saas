import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { business: true }
    })

    if (!user?.business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Verify ownership before deleting
    const vessel = await prisma.customVessel.findFirst({
      where: { id, businessId: user.business.id }
    })

    if (!vessel) {
      return NextResponse.json({ error: 'Vessel not found' }, { status: 404 })
    }

    await prisma.customVessel.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE custom-vessel error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
