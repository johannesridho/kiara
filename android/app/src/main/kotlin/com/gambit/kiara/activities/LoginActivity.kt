package com.gambit.kiara.activities

import android.annotation.TargetApi
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat
import android.support.v4.os.CancellationSignal
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.gambit.kiara.R
import com.gambit.kiara.utils.PreferencesHelper
import kotlinx.android.synthetic.main.activity_login.*
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator

/**
 * Created by itock on 3/24/2018.
 */
class LoginActivity : AppCompatActivity() {

    private val ANDROID_KEY_STORE = "AndroidKeyStore"
    private val CIPHER_KEY_NAME = "Kiara"

    private var pin = ""

    @TargetApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        buttonKeypad1?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "1") }
        buttonKeypad2?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "2") }
        buttonKeypad3?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "3") }
        buttonKeypad4?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "4") }
        buttonKeypad5?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "5") }
        buttonKeypad6?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "6") }
        buttonKeypad7?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "7") }
        buttonKeypad8?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "8") }
        buttonKeypad9?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "9") }
        buttonKeypad0?.setOnClickListener { editInput(ButtonType.BUTTON_NUMBER, "0") }
        buttonKeypadBackspace?.setOnClickListener { editInput(ButtonType.BUTTON_BACKSPACE) }
        buttonKeypadEnter?.setOnClickListener { editInput(ButtonType.BUTTON_ENTER) }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && FingerprintManagerCompat.from(this).isHardwareDetected) {
            imageFingerprint?.visibility = View.VISIBLE

            try {
                val keystore = KeyStore.getInstance(ANDROID_KEY_STORE)
                val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, ANDROID_KEY_STORE)
                val cipher = Cipher.getInstance("${KeyProperties.KEY_ALGORITHM_AES}/${KeyProperties.BLOCK_MODE_CBC}/${KeyProperties.ENCRYPTION_PADDING_PKCS7}")
                val parameterSpec = KeyGenParameterSpec.Builder(CIPHER_KEY_NAME, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
                        .setUserAuthenticationRequired(true)
                        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
                        .build()

                keystore.load(null)
                keyGenerator.init(parameterSpec)
                keyGenerator.generateKey()

                val secretKey = keystore.getKey(CIPHER_KEY_NAME, null)
                cipher.init(Cipher.ENCRYPT_MODE, secretKey)

                val cryptoObject = FingerprintManagerCompat.CryptoObject(cipher)

                val cancellationSignal = CancellationSignal()
                val authCallback = object : FingerprintManagerCompat.AuthenticationCallback() {

                    override fun onAuthenticationSucceeded(result: FingerprintManagerCompat.AuthenticationResult?) {
                        onAuthSuccess()
                    }
                }

                FingerprintManagerCompat.from(this).authenticate(cryptoObject, 0, cancellationSignal, authCallback, null)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun editInput(pressedButton: ButtonType, buttonNumber: String? = null) {
        val isEmpty = textPin?.text?.isEmpty()
        val isFull = textPin?.text?.length == 4

        when (pressedButton) {
            ButtonType.BUTTON_NUMBER -> {
                if (!isFull) {
                    pin = "$pin$buttonNumber"
                    textPin?.text = "${textPin?.text}*"
                }
            }
            ButtonType.BUTTON_BACKSPACE -> {
                if (!isEmpty!!) {
                    pin = pin.substring(0, pin.length - 1)
                    textPin?.text = textPin?.text?.substring(0, textPin?.text?.length!! - 1)
                }
            }
            ButtonType.BUTTON_ENTER -> submit()
        }
    }

    private fun submit() {
        if (pin == "1589") {
            onAuthSuccess()
        } else {
            pin = ""
            textPin?.text = ""
        }
    }

    private fun onAuthSuccess() {
        PreferencesHelper.userId = "57eca26dd4050d13616131ae"

        finish()
        startActivity(Intent(this, MainActivity::class.java))
    }

    private enum class ButtonType {
        BUTTON_NUMBER,
        BUTTON_BACKSPACE,
        BUTTON_ENTER
    }
}