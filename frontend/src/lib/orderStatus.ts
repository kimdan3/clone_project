import { DeliveryStatus } from '@/constants/deliveryStatus'

const orderStatusMap: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PREPARING]: 'Preparing',
  [DeliveryStatus.DELIVERING]: 'Delivering',
  [DeliveryStatus.COMPLETED]: 'Delivered',
}

export const getOrderStatus = (status: DeliveryStatus) => orderStatusMap[status]
