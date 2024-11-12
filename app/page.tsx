import { ImageUploader } from '@/components/ImageUploader'

export default function Home() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center px-12 py-[0]">
      <h1 className="text-4xl font-bold mb-8 gradient">Image to WebP Converter</h1>
      <ImageUploader />
    </main>
  )
}