import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import GiftMessageSection from "@/components/order/GiftMessageSection";
import ProductInfoSection from "@/components/order/ProductInfoSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import OrderSubmitBar from "@/components/order/OrderSubmitBar";
import { FormProvider, useForm } from "react-hook-form";
import type { FormValues } from "@/components/order/type";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { cardData } from "@/mocks/orderCardData";
import { useOrderMutation } from "@/api/mutations";
import ApiErrorBoundary from "@/components/common/Error/ApiErrorBoundary";

function OrderPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user } = useAuth();
  const { productName, quantity } = useOrder();
  const [selectedCardId, setSelectedCardId] = useState<string>(
    String(cardData[0].id)
  );
  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      message: "",
      sender: user?.name || "",
      receivers: [{ name: "", phone: "", quantity: 1 }],
    },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { mutate } = useOrderMutation(productName, quantity, navigate);

  const onSubmit = (data: FormValues) => {
    mutate({
      productId: Number(productId),
      message: data.message,
      messageCardId: selectedCardId,
      ordererName: data.sender,
      receivers: data.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    });
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <GiftMessageSection
          register={register}
          errors={errors}
          setValue={setValue}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
        <HorizontalSpacing size="spacing3" />
        <SenderSection register={register} errors={errors} />
        <HorizontalSpacing size="spacing3" />
        <ReceiverSection />
        <HorizontalSpacing size="spacing3" />
        <ApiErrorBoundary>
          <ProductInfoSection />
        </ApiErrorBoundary>
        <HorizontalSpacing size="spacing3" />
        <OrderSubmitBar formRef={formRef} />
      </form>
    </FormProvider>
  );
}

export default OrderPage;
