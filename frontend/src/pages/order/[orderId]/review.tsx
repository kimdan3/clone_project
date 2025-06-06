import { ChangeEvent, useEffect, useState, useTransition } from 'react'
import Image from 'next/image'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { BsCamera, BsCheckCircleFill } from 'react-icons/bs'
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

import { CloseButton } from '@/components/common/CloseButton'
import { StarRatingInput } from '@/components/common/StarRatingInput'
import { useOrder } from '@/queries/order'
import { useSubmitReview } from '@/queries/review'
import { useImageUpload } from '@/queries/upload'
import { ReviewMenu } from '@/types/review'

export default function OrderReview({ orderId }: { orderId: string }) {
  const { data } = useOrder(orderId)
  const [, startTransition] = useTransition()
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [image, setImage] = useState<string | undefined>()
  const [menus, setMenus] = useState<ReviewMenu[]>([])

  const router = useRouter()

  useEffect(() => {
    if (!data) return

    const _menus = data.menus.map(({ menu }) => ({
      _id: menu._id.toString(),
      name: menu.name,
      like: false,
      dislike: false
    }))

    setMenus(_menus)
  }, [data])

  const { mutate: uploadImage } = useImageUpload()
  const { mutate: submitReview } = useSubmitReview()

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    startTransition(() => {
      setReview(e.target.value)
    })
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const formData = new FormData()
    formData.append('img', e.target.files[0])
    console.log(e.target.files)

    uploadImage(formData, {
      onSuccess(data) {
        setImage(data)
      },
    })
  }

  const handleLikeMenu = (_id: string) => {
    setMenus((prev) => {
      const arr = [...prev]
      const menu = arr.find((menu) => menu._id === _id)
      if (!menu) return arr

      menu.like = true
      menu.dislike = false
      return arr
    })
  }

  const handleDislikeMenu = (_id: string) => {
    setMenus((prev) => {
      const arr = [...prev]
      const menu = arr.find((menu) => menu._id === _id)
      if (!menu) return arr

      menu.like = false
      menu.dislike = true
      return arr
    })
  }

  const handleSubmitReview = () => {
    if (!data?.store._id) return

    submitReview(
      {
        order: orderId,
        store: data?.store._id,
        menus,
        image,
        review,
        rating,
      },
      {
        onSuccess: () => {
          alert('Your review has been submitted successfully.')
          router.push('/history')
        },
      }
    )
  }

  return (
    <>
      <div className="pb-16">
        <div className="relative grid place-items-center p-4 text-lg font-bold">
          <div className="absolute left-4 top-0 flex h-full items-center">
            <CloseButton href="/history" />
          </div>
          Satisfaction Rating & Review
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 grid justify-end text-4xl text-blue-500">
            <BsCheckCircleFill />
          </div>
          <div className="col-span-10 grid gap-4 pr-4">
            <h2 className="text-2xl font-bold">Food Rating</h2>
            <div className="text-lg">
              {data?.store?.name}
              <div className="pt-1 text-lg text-yellow-400">
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>
            </div>
            <textarea
              placeholder="Please share your experience about the food's taste, price, and portion size to help other customers."
              className="p-2 "
              rows={5}
              onChange={handleTextArea}
            />
            <div className="flex gap-2">
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center border border-gray-400 p-2 text-sm"
              >
                <BsCamera className="text-3xl" />
                Add Photo
              </label>
              {image && (
                <Image
                  src={image}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-cover"
                  alt="Uploaded image"
                />
              )}
            </div>
            {menus.map(({ _id, name, like, dislike }) => (
              <div className="flex" key={_id}>
                <div className="flex-grow">{name}</div>
                <div className="flex gap-2 text-gray-500">
                  <button
                    className={`rounded-full border px-3 py-2 ${
                      like ? 'bg-blue-100 text-blue-500' : ''
                    }`}
                    onClick={() => handleLikeMenu(_id)}
                  >
                    {like ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  </button>
                  <button
                    className={`rounded-full border px-3 py-2 ${
                      dislike ? 'bg-red-100 text-red-500' : ''
                    }`}
                    onClick={() => handleDislikeMenu(_id)}
                  >
                    {dislike ? <FaThumbsDown /> : <FaRegThumbsDown />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-0 grid h-16 w-screen place-items-center"
        onClick={handleSubmitReview}
      >
        Submit
      </button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query

  return {
    props: {
      orderId,
    },
  }
}
