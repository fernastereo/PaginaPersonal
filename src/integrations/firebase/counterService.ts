import { db } from '@/integrations/firebase/client'
import { doc, runTransaction } from 'firebase/firestore'
import { firestoreService } from './firestoreService'

const COUNTER_COLLECTION = 'taskCounter'

export const counterService = {
  async getNextTaskNumber(clientId: string): Promise<string>{
    const year = new Date().getFullYear()
    const prefix = (await firestoreService.getClientById([clientId]))[0].prefix
    const counterKey = `${clientId}_${year}`
    const counterRef = doc(db, COUNTER_COLLECTION, counterKey)

    try {
      const nextNumber = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef)

        let newNumber = 1
        if (counterDoc.exists()) {
          const currentNumber = counterDoc.data().lastNumber || 0

          newNumber = currentNumber + 1

          transaction.update(counterRef, {
            lastNumber: newNumber,
            updatedAt: new Date().toISOString()
          })
        } else {
          //primer consecutivo del año para este cliente
          transaction.set(counterRef, {
            clientId,
            year,
            lastNumber: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }

        return newNumber
      })

      const formattedNumber = `${prefix}-${String(nextNumber).padStart(4, '0')}`;
      return formattedNumber
    }catch (error) {
      console.error('Error en getNextTaskNumber:', error);
      throw new Error('Error al obtener el próximo número de tarea');
    }
  }
}